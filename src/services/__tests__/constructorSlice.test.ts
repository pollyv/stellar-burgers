import burgerConstructorReducer, {
  BurgerConstructorActions,
  IConstructorState,
  initialState
} from '../constructorSlice';
import { TConstructorIngredient, TIngredient } from '@utils-types';

describe('constructorSlice', () => {
  const testIngredient: TIngredient = {
    _id: '1',
    name: 'Test Ingredient',
    type: 'main',
    proteins: 10,
    fat: 10,
    carbohydrates: 10,
    calories: 100,
    price: 50,
    image: 'test-image-url',
    image_mobile: 'test-image-url',
    image_large: 'test-image-url'
  };

  const testConstructorIngredient: TConstructorIngredient = {
    ...testIngredient,
    id: 'unique-id'
  };

  const bunIngredient: TIngredient = {
    ...testIngredient,
    type: 'bun'
  };

  test('добавление ингредиента в конструктор', () => {
    const action = BurgerConstructorActions.addIngredients(testIngredient);
    const state = burgerConstructorReducer(initialState, action);
    expect(state.ingredients.length).toBe(1);
    expect(state.ingredients[0]).toEqual(
      expect.objectContaining({
        ...testIngredient,
        id: expect.any(String)
      })
    );
  });

  test('добавление булки в конструктор', () => {
    const action = BurgerConstructorActions.addIngredients(bunIngredient);
    const state = burgerConstructorReducer(initialState, action);
    expect(state.bun).toEqual(
      expect.objectContaining({
        ...bunIngredient,
        id: expect.any(String)
      })
    );
  });

  test('удаление ингредиента', () => {
    const preloadedState: IConstructorState = {
      ...initialState,
      ingredients: [testConstructorIngredient]
    };
    const action = BurgerConstructorActions.clearIngredients();
    const state = burgerConstructorReducer(preloadedState, action);
    expect(state.ingredients.length).toBe(0);
  });

  test('изменение порядка ингредиентов', () => {
    const ingredient1: TConstructorIngredient = {
      ...testIngredient,
      id: 'unique-id-1'
    };

    const ingredient2: TConstructorIngredient = {
      ...testIngredient,
      id: 'unique-id-2'
    };

    const preloadedState: IConstructorState = {
      ...initialState,
      ingredients: [ingredient1, ingredient2]
    };

    const action = BurgerConstructorActions.changeIngredientsOrder({
      initialIndex: 0,
      finishIndex: 1
    });
    const state = burgerConstructorReducer(preloadedState, action);
    expect(state.ingredients[0]).toEqual(expect.objectContaining(ingredient2));
    expect(state.ingredients[1]).toEqual(expect.objectContaining(ingredient1));

    const actionReverse = BurgerConstructorActions.changeIngredientsOrder({
      initialIndex: 1,
      finishIndex: 0
    });
    const stateReverse = burgerConstructorReducer(state, actionReverse);

    expect(stateReverse.ingredients[0]).toEqual(
      expect.objectContaining(ingredient1)
    );
    expect(stateReverse.ingredients[1]).toEqual(
      expect.objectContaining(ingredient2)
    );
  });
});
