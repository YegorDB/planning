import json

from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APITestCase

from plann.models import Task


class TasksTests(APITestCase):
    username = 'test_user_username'
    password = 'test_user_password'

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.user = (
            get_user_model().objects
            .create_user(
                username=cls.username,
                password=cls.password,
            )
        )

    @classmethod
    def tearDownClass(cls):
        cls.user.delete()
        super().tearDownClass()

    def setUp(self):
        self.client.login(username=self.username, password=self.password)

    def tearDown(self):
        self.client.logout()

    def test_create_task(self):
        name = 'test create task'
        url = reverse('api:create-task')
        data = {
            'name': name,
            'priority': Task.Priority.CRITICAL,
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        task = Task.objects.get(id=json.loads(response.content)['id'])
        self.assertEqual(task.name, name)
        self.assertEqual(task.priority, Task.Priority.CRITICAL)
        self.assertEqual(task.status, Task.Status.NOT_SET)

    def test_user_tasks(self):
        task_ids = []
        for priority, _ in Task.Priority.choices:
            task = Task.objects.create(
                name=f'task{priority}',
                priority=priority,
                creator=self.user,
                responsible=self.user,
            )
            task_ids.append(task.id)
        url = reverse('api:user-tasks')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(set(task_ids) - set(map(lambda t: t['id'], json.loads(response.content))))
