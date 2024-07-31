from random import choice

import pytest

from korean.difficulty import Hard


class TestDifficultyHard:

    def test_compose_syllables(self):

        difficulty = Hard()
        syllable_number = 1
        difficulty.compose_syllables(syllable_number)

        assert difficulty.syllable_transcriptions != {}
        assert len(difficulty.syllable_transcriptions) == syllable_number

        syllable_number = 20
        difficulty.compose_syllables(syllable_number)

        assert difficulty.syllable_transcriptions != {}
        assert len(difficulty.syllable_transcriptions) == syllable_number

        syllable_number = 1_000
        difficulty.compose_syllables(syllable_number)

        assert difficulty.syllable_transcriptions != {}
        assert len(difficulty.syllable_transcriptions) == syllable_number

    def test_compose_answer_options(self):

        difficulty = Hard()
        difficulty.compose_syllables()

        random_syllable_from_the_list = choice(list(difficulty.syllables))
        answer_options_number = 1  # To make sure that the correct answer is in an option list.
        answer_options = difficulty.compose_answer_options(random_syllable_from_the_list, answer_options_number)

        assert len(answer_options) == answer_options_number
        assert difficulty.syllable_transcriptions[random_syllable_from_the_list] in answer_options

        answer_options_number = 4
        answer_options = difficulty.compose_answer_options(random_syllable_from_the_list, answer_options_number)

        assert len(answer_options) == answer_options_number
        assert difficulty.syllable_transcriptions[random_syllable_from_the_list] in answer_options

        answer_options_number = 20  # The limit is 20 as the default is 20.
        answer_options = difficulty.compose_answer_options(random_syllable_from_the_list, answer_options_number)

        assert len(answer_options) == answer_options_number
        assert difficulty.syllable_transcriptions[random_syllable_from_the_list] in answer_options

    def test_compose_questions(self):

        difficulty = Hard()
        difficulty.compose_syllables()

        answer_options_number = 4
        questions = difficulty.compose_questions(answer_options_number)

        assert isinstance(questions, list) is True
        assert isinstance(questions[0], dict) is True
        assert len(questions[0]['answer_options']) == answer_options_number
