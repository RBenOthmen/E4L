from djoser import email


class ActivationEmail(email.ActivationEmail):
    template_name = 'mailing/activation.html'

class PasswordResetEmail(email.PasswordResetEmail):
    template_name = "mailing/password_reset.html"