import django.core.exceptions

class EmptyMandatoryFieldException(Exception):
    pass

class ExpirationDateException(Exception):
    pass