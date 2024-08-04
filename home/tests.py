from django.test import TestCase
from django.urls import reverse


class ViewsTest(TestCase):

    def setUp(self):
        pass

    def test_main(self):
        response = self.client.get(reverse('home:home'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'home/home.html')
        self.assertContains(response, '<title>10k apps</title>')
