from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('plann', '0003_auto_20210918_2205'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='task',
            name='status',
        ),
        migrations.AddField(
            model_name='task',
            name='status',
            field=models.SmallIntegerField(
                choices=[
                    (0, 'Canceled'),
                    (1, 'Done'),
                    (2, 'Not started'),
                    (3, 'In progress')
                ],
                default=2
            ),
        ),
    ]
