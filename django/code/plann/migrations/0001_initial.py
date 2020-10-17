from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField(blank=True, default='')),
                ('deadline', models.DateTimeField()),
                ('duration', models.DurationField()),
                ('priority', models.SmallIntegerField(choices=[(0, 'Not set'), (1, 'Low'), (2, 'Normal'), (3, 'High'), (4, 'Critical')], default=0)),
                ('status', models.CharField(choices=[('NS', 'Not set'), ('IP', 'In progress'), ('DN', 'Done'), ('CL', 'Canceled')], default='NS', max_length=2)),
                ('creator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='created_tasks', to=settings.AUTH_USER_MODEL)),
                ('depends_on', models.ManyToManyField(related_name='_task_depends_on_+', to='plann.Task')),
                ('parent', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='children', to='plann.task')),
                ('responsible', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tasks', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
