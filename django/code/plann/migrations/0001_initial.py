from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('deadline', models.DateTimeField()),
                ('priority', models.SmallIntegerField(choices=[(0, 'Not set'), (1, 'Low'), (2, 'Normal'), (3, 'High'), (4, 'Critical')], default=0)),
                ('depends_on', models.ManyToManyField(related_name='_task_depends_on_+', to='plann.Task')),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='plann.project')),
            ],
        ),
        migrations.CreateModel(
            name='Stage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('duration', models.DurationField()),
                ('task', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='plann.task')),
            ],
        ),
    ]
