# Generated by Django 4.0.3 on 2022-04-05 11:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [ 
        ('core', '0011_remove_user_token_alter_user_is_active'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='birth_date',
            field=models.DateField(null=True),
        ),
    ]
