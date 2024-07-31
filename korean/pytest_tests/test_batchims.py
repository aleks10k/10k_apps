from random import choice

import pytest

from korean.difficulty import Batchims
from korean.source_data.batchims import BATCHIMS_TYPE_1, BATCHIMS_TYPE_3, BATCHIMS_TYPE_2, BATCHIM_TRANSCRIPTIONS


class TestDifficultyBatchims:

    def test_default_values(self):

        difficulty = Batchims()

        assert difficulty.has_batchims_type_1 is True
        assert difficulty.has_batchims_type_2 is True
        assert difficulty.has_batchims_type_3 is True

    def test_custom_values(self):

        values = [True, False]
        parameters = [choice(values), choice(values), choice(values), ]
        difficulty = Batchims(*parameters)

        assert difficulty.has_batchims_type_1 == parameters[0]
        assert difficulty.has_batchims_type_2 == parameters[1]
        assert difficulty.has_batchims_type_3 == parameters[2]

    def test_compose_full_batchim_list(self):

        difficulty = Batchims(True, True, True)
        batchims = difficulty.compose_batchims()

        assert len(batchims) == 27
        assert batchims == BATCHIMS_TYPE_1 + BATCHIMS_TYPE_2 + BATCHIMS_TYPE_3

    def test_compose_custom_batchim_list(self):

        difficulty = Batchims(True, False, False)
        batchims = difficulty.compose_batchims()
        assert len(batchims) == 15
        assert batchims == BATCHIMS_TYPE_1

        difficulty = Batchims(True, True, False)
        batchims = difficulty.compose_batchims()
        assert len(batchims) == 15 + 8

        difficulty = Batchims(True, True, True)
        batchims = difficulty.compose_batchims()
        assert len(batchims) == 15 + 8 + 4
        assert len(batchims) == 27

        difficulty = Batchims(False, True, True)
        batchims = difficulty.compose_batchims()
        assert len(batchims) == 8 + 4

        difficulty = Batchims(False, False, True)
        batchims = difficulty.compose_batchims()
        assert len(batchims) == 4

    def test_compose_answer_options(self):

        difficulty = Batchims(True, True, True)
        batchims = difficulty.compose_batchims()
        random_batchims_from_the_list = choice(batchims)

        answer_options_number = 1  # To make sure that the correct answer is in an option list.
        answer_options = difficulty.compose_answer_options(random_batchims_from_the_list, answer_options_number)

        assert len(answer_options) == answer_options_number
        assert BATCHIM_TRANSCRIPTIONS[random_batchims_from_the_list] in answer_options
        answer_options_number = 4
        answer_options = difficulty.compose_answer_options(random_batchims_from_the_list, answer_options_number)

        assert len(answer_options) == answer_options_number
        assert BATCHIM_TRANSCRIPTIONS[random_batchims_from_the_list] in answer_options

    def test_compose_questions_partial(self):
        difficulty = Batchims(False, False, True)
        answer_options_number = 4
        questions = difficulty.compose_questions(answer_options_number)

        assert isinstance(questions, list) is True
        assert isinstance(questions[0], dict) is True
        assert len(questions) == 4

        assert 'l/r' in questions[0]['answer_options']
        assert 'k/l' in questions[0]['answer_options']
        assert 'm/l' in questions[0]['answer_options']
        assert 'p/l' in questions[0]['answer_options']

    def test_compose_questions_full(self):

        difficulty = Batchims(True, True, True)
        answer_options_number = 4
        questions = difficulty.compose_questions(answer_options_number)

        assert isinstance(questions, list) is True
        assert isinstance(questions[0], dict) is True
        assert len(questions) == 27
