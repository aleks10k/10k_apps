from django.test import TestCase
from django.urls import reverse
import json


class ViewsTest(TestCase):

    def setUp(self):
        pass

    def test_main(self):
        response = self.client.get('/korean/')
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'korean/main.html')
        self.assertContains(response, '<title>Korean</title>')

    def test_batchims(self):
        response = self.client.get('/korean/batchims/')
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'korean/batchims.html')
        self.assertContains(response, '<title>Batchims</title>')

    def test_easy(self):
        response = self.client.post(reverse('korean:easy'), data={'letters_1': True, 'letters_4': True}, content_type='application/json', )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(json.loads(response.content)), 15)

    def test_medium(self):
        response = self.client.post(reverse('korean:medium'), data={'syllables_3': True, 'syllables_4': True}, content_type='application/json', )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(json.loads(response.content)), 105)

    def test_hard(self):
        response = self.client.post(reverse('korean:hard'), data={}, content_type='application/json', )
        self.assertEqual(response.status_code, 200)

    def test_batchims_difficulty(self):
        response = self.client.post('/korean/difficulty/batchims/', data={'batchims_1': True, 'batchims_3': True, }, content_type='application/json', )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(json.loads(response.content)), 19)
