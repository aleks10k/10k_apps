from random import choice

import pytest

from korean.difficulty import Medium
from korean.source_data.medium_level import SYLLABLES_TYPE_1, SYLLABLES_TYPE_4, SYLLABLES_TYPE_2, SYLLABLES_TYPE_3, \
    SYLLABLE_TRANSCRIPTIONS


class TestDifficultyMedium:

    def test_default_values(self):

        difficulty = Medium()

        assert difficulty.has_syllables_type_1 is True
        assert difficulty.has_syllables_type_2 is True
        assert difficulty.has_syllables_type_3 is True
        assert difficulty.has_syllables_type_4 is True

    def test_custom_values(self):

        values = [True, False]
        parameters = [choice(values), choice(values), choice(values), choice(values), ]
        difficulty = Medium(*parameters)

        assert difficulty.has_syllables_type_1 == parameters[0]
        assert difficulty.has_syllables_type_2 == parameters[1]
        assert difficulty.has_syllables_type_3 == parameters[2]
        assert difficulty.has_syllables_type_4 == parameters[3]

    def test_compose_full_syllable_list(self):

        difficulty = Medium(True, True, True, True)
        syllables = difficulty.compose_syllables()

        assert len(syllables) == 399
        assert syllables == SYLLABLES_TYPE_1 + SYLLABLES_TYPE_2 + SYLLABLES_TYPE_3 + SYLLABLES_TYPE_4

    def test_compose_custom_syllable_list(self):

        difficulty = Medium(True, False, False, False)
        syllables = difficulty.compose_syllables()
        assert len(syllables) == 140
        assert syllables == SYLLABLES_TYPE_1

        difficulty = Medium(True, True, False, False)
        syllables = difficulty.compose_syllables()
        assert len(syllables) == 140 + 154

        difficulty = Medium(True, True, True, False)
        syllables = difficulty.compose_syllables()
        assert len(syllables) == 140 + 154 + 50

        difficulty = Medium(True, True, True, True)
        syllables = difficulty.compose_syllables()
        assert len(syllables) == 140 + 154 + 50 + 55
        assert len(syllables) == 399

        difficulty = Medium(False, True, True, True)
        syllables = difficulty.compose_syllables()
        assert len(syllables) == 154 + 50 + 55

        difficulty = Medium(False, False, True, True)
        syllables = difficulty.compose_syllables()
        assert len(syllables) == 50 + 55

        difficulty = Medium(False, False, False, True)
        syllables = difficulty.compose_syllables()
        assert len(syllables) == 55
        assert syllables == SYLLABLES_TYPE_4

    def test_compose_answer_options(self):

        difficulty = Medium(True, False, False, False)
        syllables = difficulty.compose_syllables()
        random_syllable_from_the_list = choice(syllables)

        answer_options_number = 1  # To make sure that the correct answer is in an option list.
        answer_options = difficulty.compose_answer_options(random_syllable_from_the_list, answer_options_number)

        assert len(answer_options) == answer_options_number
        assert SYLLABLE_TRANSCRIPTIONS[random_syllable_from_the_list] in answer_options

        answer_options_number = 4
        answer_options = difficulty.compose_answer_options(random_syllable_from_the_list, answer_options_number)

        assert len(answer_options) == answer_options_number
        assert SYLLABLE_TRANSCRIPTIONS[random_syllable_from_the_list] in answer_options

        difficulty = Medium(False, False, True, False)
        syllables = difficulty.compose_syllables()
        random_syllable_from_the_list = choice(syllables)

        answer_options_number = 50  # 50 is the limit when SYLLABLES_TYPE_3 are included. It's the least limit.
        answer_options = difficulty.compose_answer_options(random_syllable_from_the_list, answer_options_number)

        assert len(answer_options) == answer_options_number
        assert SYLLABLE_TRANSCRIPTIONS[random_syllable_from_the_list] in answer_options

    def test_compose_questions(self):

        difficulty = Medium(False, False, False, True)
        syllables = difficulty.compose_syllables()
        questions = difficulty.compose_questions()

        assert syllables == SYLLABLES_TYPE_4
        assert len(questions) == 55

    def test_full_difficulty_creation(self):

        difficulty = Medium(True, True, True, True)
        syllables = difficulty.compose_syllables()
        questions = difficulty.compose_questions()

        assert syllables == SYLLABLES_TYPE_1 + SYLLABLES_TYPE_2 + SYLLABLES_TYPE_3 + SYLLABLES_TYPE_4
        assert len(questions) == 399
