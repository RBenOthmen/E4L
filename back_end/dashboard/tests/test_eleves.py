from django.http import Http404
import pytest
from rest_framework import status
from rest_framework.test import APIClient

class TestCreateEleve:
    # @pytest.mark.skip
    def test_if_user_is_anonymous_returns_401(self):
        client = APIClient()
        response = client.post('/dashboard/eleves/', {'title': 'a'})

        assert response.status_code == status.HTTP_401_UNAUTHORIZED


    def inc(x):
        return x + 1


    assert inc(3) == 4