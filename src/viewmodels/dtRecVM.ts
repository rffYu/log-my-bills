import { RecordItem } from '@/models/recordModel';
import { useSelector } from 'react-redux';


export const useDateRecordViewModel = () => {
  const records = useSelector((state: RootState) => state.record);

  const getRecByMonth = (month: string) => {
    return records.filter(rec => rec.date.startsWith(month));
  };

  const getRecGroupedByMonth = (): Record<string, RecordItem[]>  => {
    return records.reduce((acc, rec) => {
      const month = rec.date.slice(0, 7);
      if (!acc[month]) acc[month] = [];
      acc[month].push(rec);
      return acc;
    }, {} as Record<string, RecordItem[]>);
  };

  const getRecGroupedByDay = (): Record<string, RecordItem[]> => {
    return records.reduce((acc, rec) => {
      const day = rec.date;
      if (!acc[day]) acc[day] = [];
      acc[day].push(rec);
      return acc;
    }, {} as Record<string, RecordItem[]>);
  };

  const getTotalByMonth = (month: string): number => {
    const recs = getRecByMonth(month);
    return recs.reduce((sum, rec) => sum + rec.amount, 0);
  };

  const getTotalsGroupByDay = (): Record<string, number> => {
    const grouped = getRecGroupedByDay();
    const totals: Record<string, number> = {};
    for (const day in grouped) {
      totals[day] = grouped[day].reduce((acc, rec) => acc + Number(rec.amount), 0);
    }
  return totals;
  }

  return {
    getRecordByMonth: getRecByMonth,
    getRecordGroupByMonth: getRecGroupedByMonth,
    getRecordGroupByDay: getRecGroupedByDay,
    getTotalByMonth,
    getTotalsGroupByDay
  };
};

