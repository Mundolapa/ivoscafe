# managers.py
from ordered_model.models import OrderedModelManager, OrderedModelQuerySet
from parler.managers import TranslatableManager, TranslatableQuerySet


class OrderedTranslatableQuerySet(OrderedModelQuerySet, TranslatableQuerySet):
    pass

class OrderedTranslatableManager(OrderedModelManager, TranslatableManager):
    _queryset_class = OrderedTranslatableQuerySet
