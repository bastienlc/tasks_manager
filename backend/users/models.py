from authemail.models import EmailAbstractUser, EmailUserManager


class User(EmailAbstractUser):
    objects = EmailUserManager()
