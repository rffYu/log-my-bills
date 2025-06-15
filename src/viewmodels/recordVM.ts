import { addRecord, modifyRecord, deleteRecord } from '@/store';
import { RecordItem } from '@/models/recordModel';
import { useSelector, useDispatch } from 'react-redux';

export const useRecordViewModel = () => {
  const dispatch = useDispatch();
  const records = useSelector((state: RootState) => state.record);

  const maxId = () => records.length ? Math.max(...records.map(rec => rec.id)) : -1;

  const createRec = (data: Pick<Partial<RecordItem>, 'id' | 'date' | 'categoryId' | 'title' | 'type' | 'amount'>) => {
    const d: RecordItem = {
      id: maxId()+1,
      date: (data.date && data.date.trim() !== '') ? data.date : new Date().toISOString().slice(0, 10),
      type: data.type ? data.type : -1,
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

  const getRecById = (id: number): RecordItem | undefined => {
    return records.find(tx => tx.id === id);
  }

  const getRecentRecs = (num: number): RecordItem[] | undefined => {
    return [...records]
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, num);
  };

  return {
    createRecord: createRec,
    updateRecord: updateRec,
    removeRecord: removeRec,
    getRecordById: getRecById,
    getRecentRecords: getRecentRecs
  };
}
