from random import choice, shuffle, randint

from korean.source_data.batchims import BATCHIMS_TYPE_1, BATCHIMS_TYPE_2, BATCHIMS_TYPE_3, BATCHIM_TRANSCRIPTIONS
from korean.source_data.easy_level import BASIC_VOWELS, COMPOUND_VOWELS, BASIC_CONSONANTS, COMPOUND_CONSONANTS, \
    LETTER_TRANSCRIPTIONS
from korean.source_data.hard_level import INITIAL_NUMBERS, MEDIAL_NUMBERS, FINAL_NUMBERS
from korean.source_data.medium_level import SYLLABLES_TYPE_1, SYLLABLES_TYPE_2, SYLLABLES_TYPE_3, SYLLABLES_TYPE_4, \
    SYLLABLE_TRANSCRIPTIONS


class Difficulty:
    pass


class Easy(Difficulty):

    def __init__(
                self,
                has_basic_vowels: bool = True,
                has_compound_vowels: bool = True,
                has_basic_consonants: bool = True,
                has_compound_consonants: bool = True
    ) -> None:

        self.has_basic_vowels = has_basic_vowels
        self.has_compound_vowels = has_compound_vowels
        self.has_basic_consonants = has_basic_consonants
        self.has_compound_consonants = has_compound_consonants

    def compose_letters(self) -> list:

        letters = []

        if self.has_basic_vowels:
            letters.extend(BASIC_VOWELS)
        if self.has_compound_vowels:
            letters.extend(COMPOUND_VOWELS)
        if self.has_basic_consonants:
            letters.extend(BASIC_CONSONANTS)
        if self.has_compound_consonants:
            letters.extend(COMPOUND_CONSONANTS)

        return letters  # e.g. ['ㄲ', 'ㄸ', 'ㅃ', 'ㅆ', ... ]

    def compose_answer_options(self, letter: str, answer_options_number: int) -> list:

        # Increasing the answer options number above 4 for Batchims and 19 for Easy causes falling
        # into an endless loop (because of the set()).

        answer_options = set()
        answer_options.add(LETTER_TRANSCRIPTIONS[letter])  # Puts a correct answer to the set.

        while len(answer_options) < answer_options_number:

            if letter in BASIC_VOWELS:
                random_letter = choice(BASIC_VOWELS)
                answer_options.add(LETTER_TRANSCRIPTIONS[random_letter])

            elif letter in COMPOUND_VOWELS:
                random_letter = choice(COMPOUND_VOWELS)
                answer_options.add(LETTER_TRANSCRIPTIONS[random_letter])

            elif letter in BASIC_CONSONANTS:
                random_letter = choice(BASIC_CONSONANTS)
                answer_options.add(LETTER_TRANSCRIPTIONS[random_letter])

            elif letter in COMPOUND_CONSONANTS:
                random_letter = choice(COMPOUND_CONSONANTS) if answer_options_number <= 5 \
                    else choice(COMPOUND_CONSONANTS + BASIC_CONSONANTS)  # Because the compound consonants are just 5.
                answer_options.add(LETTER_TRANSCRIPTIONS[random_letter])

        return list(answer_options)  # e.g. ['jj', 'tt', 'kk', 'ss']

    def compose_questions(self, answer_options_number: int = 4) -> list[dict]:

        letters = self.compose_letters()

        questions = []

        for letter in letters:
            answer = LETTER_TRANSCRIPTIONS[letter]
            answer_options = self.compose_answer_options(letter, answer_options_number)
            questions.append({
                'question': letter,
                'answer': answer,
                'answer_options': answer_options,
            })
        shuffle(questions)
        shuffle(questions)
        return questions  # e.g. [{'question': 'ㅉ', 'answer': 'jj', 'answer_options': ['pp', 'tt', 'jj', 'ss']}, ... ]


class Medium(Difficulty):

    def __init__(
                self,
                has_syllables_type_1: bool = True,
                has_syllables_type_2: bool = True,
                has_syllables_type_3: bool = True,
                has_syllables_type_4: bool = True,
    ) -> None:

        self.has_syllables_type_1 = has_syllables_type_1
        self.has_syllables_type_2 = has_syllables_type_2
        self.has_syllables_type_3 = has_syllables_type_3
        self.has_syllables_type_4 = has_syllables_type_4

    def compose_syllables(self) -> list:

        syllables = []

        if self.has_syllables_type_1:
            syllables.extend(SYLLABLES_TYPE_1)
        if self.has_syllables_type_2:
            syllables.extend(SYLLABLES_TYPE_2)
        if self.has_syllables_type_3:
            syllables.extend(SYLLABLES_TYPE_3)
        if self.has_syllables_type_4:
            syllables.extend(SYLLABLES_TYPE_4)

        return syllables  # e.g. ['가', '갸', '거', '겨', ... ]

    def compose_answer_options(self, syllable: str, answer_options_number: int) -> list:

        answer_options = set()
        answer_options.add(SYLLABLE_TRANSCRIPTIONS[syllable])

        while len(answer_options) < answer_options_number:

            if syllable in SYLLABLES_TYPE_1:
                random_syllable = choice(SYLLABLES_TYPE_1)
                answer_options.add(SYLLABLE_TRANSCRIPTIONS[random_syllable])

            if syllable in SYLLABLES_TYPE_2:
                random_syllable = choice(SYLLABLES_TYPE_2)
                answer_options.add(SYLLABLE_TRANSCRIPTIONS[random_syllable])

            if syllable in SYLLABLES_TYPE_3:
                random_syllable = choice(SYLLABLES_TYPE_3)
                answer_options.add(SYLLABLE_TRANSCRIPTIONS[random_syllable])

            if syllable in SYLLABLES_TYPE_4:
                random_syllable = choice(SYLLABLES_TYPE_4)
                answer_options.add(SYLLABLE_TRANSCRIPTIONS[random_syllable])

        return list(answer_options)  # e.g. ['ga', 'nyeo', 'yo', 'meu']

    def compose_questions(self, answer_options_number: int = 4) -> list[dict]:

        syllables = self.compose_syllables()

        questions = []

        for syllable in syllables:
            answer = SYLLABLE_TRANSCRIPTIONS[syllable]
            answer_options = self.compose_answer_options(syllable, answer_options_number)
            questions.append({
                'question': syllable,
                'answer': answer,
                'answer_options': answer_options,
            })
        shuffle(questions)
        shuffle(questions)
        return questions
        # e.g. [{'question': '가', 'answer': 'ga', 'answer_options': ['teo', 'yu', 'ga', 'keu']}, ... ]


class Hard(Difficulty):

    def __init__(self):
        self.syllable_transcriptions = {}
        self.syllables = []

    def compose_syllables(self, syllable_number: int = 20) -> None:

        while len(self.syllable_transcriptions) < syllable_number:

            initial_number = randint(0, 18)
            medial_number = randint(0, 20)
            final_number = randint(1, 27)

            syllable = chr((initial_number * 588) + (medial_number * 28) + final_number + 44032)
            transcription = INITIAL_NUMBERS[initial_number] + MEDIAL_NUMBERS[medial_number] + FINAL_NUMBERS[final_number]

            self.syllable_transcriptions[syllable] = transcription
            self.syllables.append(syllable)

    def compose_answer_options(self, syllable: str, answer_options_number: int) -> list:

        answer_options = set()
        answer_options.add(self.syllable_transcriptions[syllable])

        while len(answer_options) < answer_options_number:

            random_syllable = choice(self.syllables)
            answer_options.add(self.syllable_transcriptions[random_syllable])

        return list(answer_options)  # e.g. ['deok', 'euk', 'jeut', 'kaem']

    def compose_questions(self, answer_options_number: int = 4) -> list[dict]:

        self.compose_syllables()

        questions = []

        for syllable in self.syllables:
            answer = self.syllable_transcriptions[syllable]
            answer_options = self.compose_answer_options(syllable, answer_options_number)
            questions.append({
                'question': syllable,
                'answer': answer,
                'answer_options': answer_options,
            })
        shuffle(questions)
        shuffle(questions)
        return questions
        # e.g. [{'question': '즜', 'answer': 'jeut', 'answer_options': ['deok', 'euk', 'jeut', 'kaem']}, ... ]


class Batchims(Difficulty):

    def __init__(
            self,
            has_batchims_type_1: bool = True,
            has_batchims_type_2: bool = True,
            has_batchims_type_3: bool = True,

    ) -> None:
        self.has_batchims_type_1 = has_batchims_type_1
        self.has_batchims_type_2 = has_batchims_type_2
        self.has_batchims_type_3 = has_batchims_type_3

    def compose_batchims(self) -> list:

        batchims = []

        if self.has_batchims_type_1:
            batchims.extend(BATCHIMS_TYPE_1)
        if self.has_batchims_type_2:
            batchims.extend(BATCHIMS_TYPE_2)
        if self.has_batchims_type_3:
            batchims.extend(BATCHIMS_TYPE_3)

        return batchims  # e.g. ['ㄹ', 'ㄺ', 'ㄻ', ... ]

    def compose_answer_options(self, batchim: str, answer_options_number: int) -> list:

        answer_options = set()
        answer_options.add(BATCHIM_TRANSCRIPTIONS[batchim])

        while len(answer_options) < answer_options_number:

            if batchim in BATCHIMS_TYPE_1:
                random_batchim = choice(BATCHIMS_TYPE_1)
                answer_options.add(BATCHIM_TRANSCRIPTIONS[random_batchim])

            elif batchim in BATCHIMS_TYPE_2:
                random_batchim = choice(BATCHIMS_TYPE_2)
                answer_options.add(BATCHIM_TRANSCRIPTIONS[random_batchim])

            elif batchim in BATCHIMS_TYPE_3:
                random_batchim = choice(BATCHIMS_TYPE_3)
                answer_options.add(BATCHIM_TRANSCRIPTIONS[random_batchim])

        return list(answer_options)  # e.g. ['p', 't', 'k', 'ng']

    def compose_questions(self, answer_options_number: int = 4) -> list[dict]:

        batchims = self.compose_batchims()

        questions = []

        for batchim in batchims:
            answer = BATCHIM_TRANSCRIPTIONS[batchim]
            answer_options = self.compose_answer_options(batchim, answer_options_number)
            questions.append({
                'question': batchim,
                'answer': answer,
                'answer_options': answer_options,
            })
        shuffle(questions)
        shuffle(questions)
        return questions  # e.g. [{'question': 'ㅅ', 'answer': 't', 'answer_options': ['t', 'k', 'n', 'b']}, ... ]
