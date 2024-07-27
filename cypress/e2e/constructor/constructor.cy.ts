describe('Страница конструктора бургера', () => {
  const testUrl = 'http://localhost:4000';
  const modalSelector = '[data-cy="modal"]';

  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients'); // перехват запроса на эндпоинт
    cy.intercept('GET', 'api/auth/user', {
      fixture: 'login.json'
    }); // данные ответа на запрос пользователя
    cy.intercept('POST', 'api/orders', {
      fixture: 'order.json'
    }).as('postOrder'); // данные ответа на запрос заказа

    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refreshToken')
    ); // моковые токены
    cy.setCookie('accessToken', 'test-accessToken');
    cy.viewport(1300, 800);
    cy.visit(testUrl);
  });

  afterEach(function () {
    cy.clearLocalStorage();
    cy.clearCookies();
  }); // очищаем хранилище после выполнения теста

  it('Показывается прелоадер во время загрузки ингредиентов', () => {
    cy.visit(testUrl);
    cy.wait('@getIngredients');
    cy.get('main').should('contain', 'Соберите бургер');
    cy.get('h1').should('contain', 'Соберите бургер');
  });

  it('Выдается ошибка при неудачном получении ингредиентов', () => {
    cy.visit(testUrl);
    cy.wait('@getIngredients');
  });

  it('Добавляются булоки и начинки в конструктор', () => {
    cy.visit(testUrl);
    cy.wait('@getIngredients');
    // Добавление булки
    cy.get('[data-ing="ingredient-item-bun"]').contains('Добавить').click();
    cy.get('[data-cy="constructor-bun-1"]').should('exist');
    cy.get('[data-cy="constructor-bun-2"]').should('exist');

    // Добавление начинки
    cy.get('[data-ing="ingredient-item-main"]').contains('Добавить').click();
    cy.get('[data-cy="constructor-topping"]').should('exist');

    cy.get('[data-ing="ingredient-item-sauce"]').contains('Добавить').click();
    cy.get('[data-cy="constructor-topping"]').should('exist');
  });

  it('Открывается и закрыватся модальное окно ингредиента', () => {
    cy.visit(testUrl);
    cy.wait('@getIngredients');

    cy.get('[data-cy="ingredient-item-1"]').click(); //нажатие на ингредиент для открытия модального окна
    cy.get(modalSelector).should('be.visible');

    cy.get('[data-cy="modal-close-btn"]').click(); // закрытие модального окна на крестик
    cy.get(modalSelector).should('not.exist');
  });

  it('Закрывается модальное окно ингредиента по клику на оверлей', () => {
    cy.visit(testUrl);
    cy.wait('@getIngredients');

    cy.get('[data-cy="ingredient-item-2"]').click(); //нажатие на ингредиент для открытия модального окна
    cy.get(modalSelector).should('be.visible');

    cy.get('[data-cy="modal-overlay"]').click('topRight', { force: true }); // закрытие модального окна по нажатию на оверлей
    cy.get(modalSelector).should('not.exist');
  });

  it('Проверка создания заказа', () => {
    cy.visit(testUrl); //собирается бургер
    cy.wait('@getIngredients');
    cy.get('[data-ing="ingredient-item-bun"]').contains('Добавить').click();
    cy.get('[data-ing="ingredient-item-main"]').contains('Добавить').click();
    cy.get('[data-ing="ingredient-item-sauce"]').contains('Добавить').click();

    cy.get('[data-cy=order-summ] button').click(); //срабатывает кнопка «Оформить заказ»

    cy.get(modalSelector).contains('47647').should('exist'); //проверка номера заказа

    cy.get('[data-cy="modal-close-btn"]').click(); //проверка закрытия
    cy.get(modalSelector).should('not.exist');

    //Проверяется, что конструктор пуст.
    cy.get('[data-cy=constructor]')
      .contains('Ингредиент 1')
      .should('not.exist');
    cy.get('[data-cy=constructor]')
      .contains('Ингредиент 3')
      .should('not.exist');
    cy.get('[data-cy=constructor]')
      .contains('Ингредиент 4')
      .should('not.exist');
  });
});
