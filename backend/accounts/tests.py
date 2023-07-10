from django.test import TestCase
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model


class RegistrationTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_registration(self):
        # Create a test user payload with all required fields
        payload = {
            'username': 'testuser8',
            'email': 'testuser8@example.com',
            'password1': 'testpassword',
            'password2': 'testpassword',
            'first_name': 'John',
            'last_name': 'Doe8',
        }

        # Send a POST request to the registration endpoint
        response = self.client.post('/en/api/accounts/registration/', data=payload)

        # Assert that the response has a successful status code (e.g., 201)
        self.assertEqual(response.status_code, 201)

        # Assert that the user is created with the expected first_name and last_name
        user = get_user_model().objects.get(email='testuser8@example.com')
        self.assertEqual(user.first_name, 'John')
        self.assertEqual(user.last_name, 'Doe8')
