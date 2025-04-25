import { RecordItem } from '@/models/recordModel';
import { useSelector } from 'react-redux';

interface DateTotal {
  date: string;
  value: number;
}

interface DateRecs {
  date: string;
  recs: RecordItem[];
}

interface DateStats {
  date: string;
  count: number;
  total: number;
}

export const useDateRecordViewModel = () => {
  const records = useSelector((state: RootState) => state.record);

  const getRecsByMonth = (month: string): RecordItem[] => {
    return records.filter(rec => rec.date.startsWith(month));
  };

  const getRecsGroupByDay = (): DateRecs[] => {
    const dayMap: Record<string, RecordItem[]> = records.reduce((acc, rec) => {
      const day = rec.date;
      if (!acc[day]) acc[day] = [];
      acc[day].push(rec);
      return acc;
    }, {} as Record<string, RecordItem[]>);

    return Object.entries(dayMap).map(([date, recs]) => ({
      date,
      recs,
    }));
  };

  const getRecsByMonthGroupedByDay = (month: string): DateRecs[] => {
    const recs = getRecsByMonth(month);

    // Reduce to group records by day
    const dayMap: { [day: string]: RecordItem[] } = recs.reduce((acc, rec) => {
      const day = rec.date; // Assuming rec.date is a string (e.g., "2025-04-01")
      if (!acc[day]) acc[day] = [];
      acc[day].push(rec);
      return acc;
    }, {} as { [day: string]: RecordItem[] });

    // Map grouped records into the desired format
    return Object.entries(dayMap).map(([day, recs]) => ({
      date: day,
      recs
    }));
  };

  const getTotalByMonth = (month: string): number => {
    const recs = getRecsByMonth(month);
    return recs?.reduce((sum, rec) => sum + Number(rec.amount) * Number(rec.type || 1), 0) || 0;
  };

  const getTotalsGroupByDay = (): DateTotal[] => {
    const dtRecs = getRecsGroupByDay();

    return dtRecs.map(({ date, recs }) => ({
      date,
      value: recs?.reduce((acc, rec) => acc + Number(rec.amount) * Number(rec.type || 1), 0) || 0
    }));
  };

  const getTotalsGroupByDayForMonth = (month: string): DateTotal[] => {
    const dtRecs = getRecsGroupByDay();
    const filtered = dtRecs.filter(({ date }) => date.startsWith(month));
    return filtered.map(({date, recs}) => ({
      date,
      value: recs?.reduce((acc, rec) => acc + Number(rec.amount) * Number(rec.type || 1), 0) || 0
    }));
  };

  const getStatsPerDayForMonth = (month: string): DateStats[] => {
    const dtRecs = getRecsByMonthGroupedByDay(month);

    return dtRecs.map(({ date, recs }) => ({
      date,
      total: recs?.reduce((sum, rec) => sum + Number(rec.amount) * Number(rec.type || 1), 0) || 0,
      count: recs?.length || 0,
    }));
  }

  return {
    getRecordsByMonth: getRecsByMonth,
    getRecordsGroupedByDayForMonth: getRecsByMonthGroupedByDay,
    getTotalByMonth,
    getTotalsGroupByDay,
    getTotalsGroupByDayForMonth,
    getStatsPerDayForMonth
  };
};

