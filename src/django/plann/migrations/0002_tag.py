from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('plann', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True)),
            ],
        ),
        migrations.AddField(
            model_name='task',
            name='tags',
            field=models.ManyToManyField(to='plann.Tag'),
        ),
    ]
