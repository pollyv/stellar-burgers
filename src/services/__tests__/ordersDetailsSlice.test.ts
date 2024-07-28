import { TOrder } from '@utils-types';
import { getOrderByNumberApi } from '@api';
import orderReducer, {
  getDetailsOrder,
  initialState
} from '../ordersDetailsSlice';
import { configureStore } from '@reduxjs/toolkit';

jest.mock('@api', () => ({
  getOrderByNumberApi: jest.fn()
}));

const mockGetOrderByNumberApi = getOrderByNumberApi as jest.MockedFunction<
  typeof getOrderByNumberApi
>;

const mockOrder: TOrder = {
  _id: 'order-id',
  status: 'done',
  name: 'Test Order',
  createdAt: '2024-07-01T00:00:00.000Z',
  updatedAt: '2024-07-01T00:00:00.000Z',
  number: 123,
  ingredients: ['ingredient1', 'ingredient2']
};

describe('orderSlice', () => {
  beforeEach(() => {
    mockGetOrderByNumberApi.mockReset();
  });

  describe('reducer', () => {
    test('вернуть начальное состояние', () => {
      expect(orderReducer(undefined, { type: 'unknown' })).toEqual(
        initialState
      );
    });

    test('обработка getDetailsOrder.pending', () => {
      const action = { type: getDetailsOrder.pending.type };
      const state = orderReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        orderRequest: true,
        errorDetailsOrder: null
      });
    });

    test('обработка getDetailsOrder.fulfilled', () => {
      const action = {
        type: getDetailsOrder.fulfilled.type,
        payload: { orders: [mockOrder] }
      };
      const state = orderReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        order: action.payload.orders[0],
        orderRequest: false
      });
    });

    test('обработка getDetailsOrder.rejected', () => {
      const action = { type: getDetailsOrder.rejected.type };
      const state = orderReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        orderRequest: false,
        errorDetailsOrder: 'Order data Error'
      });
    });
  });

  describe('async thunk', () => {
    const createOrderSliceTestStore = () => {
      return configureStore({
        reducer: {
          order: orderReducer
        }
      });
    };

    beforeEach(() => {
      mockGetOrderByNumberApi.mockReset();
    });

    test('успешное выполнение getDetailsOrder', async () => {
      mockGetOrderByNumberApi.mockResolvedValue({
        success: true,
        orders: [mockOrder]
      });
      const store = createOrderSliceTestStore();
      await store.dispatch(getDetailsOrder(123) as any);
      const state = store.getState().order;
      expect(state.order).toEqual(mockOrder);
      expect(state.orderRequest).toBe(false);
    });

    test('Ошибка в выполнении getDetailsOrder', async () => {
      mockGetOrderByNumberApi.mockRejectedValue(new Error('Failed to fetch'));
      const store = createOrderSliceTestStore();
      await store.dispatch(getDetailsOrder(123) as any);
      const state = store.getState().order;
      expect(state.order).toBeNull();
      expect(state.orderRequest).toBe(false);
      expect(state.errorDetailsOrder).toBe('Order data Error');
    });
  });
});
