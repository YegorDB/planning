from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('plann', '0002_tag'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='depends_on',
            field=models.ManyToManyField(related_name='depending', related_query_name='depending', to='plann.Task'),
        ),
    ]
