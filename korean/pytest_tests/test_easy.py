from random import choice

import pytest

from korean.difficulty import Easy
from korean.source_data.easy_level import BASIC_VOWELS, COMPOUND_CONSONANTS, LETTER_TRANSCRIPTIONS, COMPOUND_VOWELS, \
    BASIC_CONSONANTS


class TestDifficultyEasy:

    def test_default_values(self):

        difficulty = Easy()

        assert difficulty.has_basic_vowels is True
        assert difficulty.has_compound_vowels is True
        assert difficulty.has_basic_consonants is True
        assert difficulty.has_compound_consonants is True

    def test_custom_values(self):

        difficulty = Easy(False, False, True, False)

        assert difficulty.has_basic_vowels is False
        assert difficulty.has_compound_vowels is False
        assert difficulty.has_basic_consonants is True
        assert difficulty.has_compound_consonants is False

        # OR ----------------------------------------------

        values = [True, False]
        parameters = [choice(values), choice(values), choice(values), choice(values), ]
        difficulty = Easy(*parameters)

        assert difficulty.has_basic_vowels == parameters[0]
        assert difficulty.has_compound_vowels == parameters[1]
        assert difficulty.has_basic_consonants == parameters[2]
        assert difficulty.has_compound_consonants == parameters[3]

    def test_compose_full_letter_list(self):

        difficulty = Easy(True, True, True, True)
        letters = difficulty.compose_letters()

        assert len(letters) == 40
        assert letters == BASIC_VOWELS + COMPOUND_VOWELS + BASIC_CONSONANTS + COMPOUND_CONSONANTS

    def test_compose_custom_letter_list(self):

        difficulty = Easy(True, False, False, True)
        letters = difficulty.compose_letters()

        assert letters == BASIC_VOWELS + COMPOUND_CONSONANTS

    def test_compose_answer_options(self):

        difficulty = Easy(True, False, False, False)
        letters = difficulty.compose_letters()
        random_letter_from_the_list = choice(letters)
        answer_options_number = 4
        answer_options = difficulty.compose_answer_options(random_letter_from_the_list, answer_options_number)
        assert len(answer_options) == answer_options_number
        assert LETTER_TRANSCRIPTIONS[random_letter_from_the_list] in answer_options

    def test_compose_answer_options_when_only_compound_consonants_with_more_than_four_options(self):

        difficulty = Easy(False, False, False, True)
        letters = difficulty.compose_letters()
        random_letter_from_the_list = choice(letters)
        answer_options_number = 5
        answer_options = difficulty.compose_answer_options(random_letter_from_the_list, answer_options_number)

        print(random_letter_from_the_list)
        print(answer_options)

        assert len(answer_options) == answer_options_number
        assert LETTER_TRANSCRIPTIONS[random_letter_from_the_list] in answer_options

    def test_compose_questions(self):

        difficulty = Easy(False, False, False, True)
        letters = difficulty.compose_letters()
        questions = difficulty.compose_questions()

        assert isinstance(questions, list) is True
        assert isinstance(questions[0], dict) is True
        assert letters == COMPOUND_CONSONANTS
        assert len(questions) == 5

    def test_full_difficulty_creation(self):

        difficulty = Easy(True, True, True, True)
        letters = difficulty.compose_letters()
        questions = difficulty.compose_questions()

        assert letters == BASIC_VOWELS + COMPOUND_VOWELS + BASIC_CONSONANTS + COMPOUND_CONSONANTS
        assert len(questions) == 40
