
class Configurator:

    def is_empty(self) -> bool:

        parameter_values = self.__dict__.values()

        if True in parameter_values:
            return False
        else:
            return True

    def get_parameters(self) -> dict:
        return self.__dict__


class EasyConfig(Configurator):

    def __init__(self, request_body: dict) -> None:

        self.has_basic_vowels = request_body.get('letters_1', False)
        self.has_compound_vowels = request_body.get('letters_2', False)
        self.has_basic_consonants = request_body.get('letters_3', False)
        self.has_compound_consonants = request_body.get('letters_4', False)


class MediumConfig(Configurator):

    def __init__(self, request_body: dict) -> None:

        self.has_syllables_type_1 = request_body.get('syllables_1', False)
        self.has_syllables_type_2 = request_body.get('syllables_2', False)
        self.has_syllables_type_3 = request_body.get('syllables_3', False)
        self.has_syllables_type_4 = request_body.get('syllables_4', False)


class BatchimConfig(Configurator):

    def __init__(self, request_body: dict) -> None:

        self.has_batchims_type_1 = request_body.get('batchims_1', False)
        self.has_batchims_type_2 = request_body.get('batchims_2', False)
        self.has_batchims_type_3 = request_body.get('batchims_3', False)
