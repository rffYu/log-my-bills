import { addRecord, modifyRecord, deleteRecord } from '@/store';
import { RecordItem } from '@/models/recordModel';
import { useSelector, useDispatch } from 'react-redux';

export const useRecordViewModel = () => {
  const dispatch = useDispatch();
  const records = useSelector((state: RootState) => state.record);

  const createRec = (data: Partial<RecordItem, 'id' | 'date' | 'categoryId' | 'title' | 'type'>) => {
    const d: RecordItem = {
      id: Date.now(),
      date: data.date && data.date.trim() !== '' ? data.date : new Date().toLocaleDateString(),
      type: data.type && data.type.trim() !== '' ? data.type : '1',
      currency: data.currency && data.currency.trim() !== '' ? data.currency : 'cny',
      categoryId: data.categoryId ?? 0,
      title: data.title ?? '',
      amount: data.amount ?? 0,
    };
    dispatch(addRecord(d));
  };

  const updateRec = (data: RecordItem) => {
    dispatch(modifyRecord(data));
  };

  const removeRec = (id: number) => {
    dispatch(deleteRecord(id));
  };

  const getRecById = (id: number): RecordItem | undefined =>
    records.find(tx => tx.id === id);

  return {
    createRecord: createRec,
    updateRecord: updateRec,
    removeRecord: removeRec,
    getRecordById: getRecById
  };
}
