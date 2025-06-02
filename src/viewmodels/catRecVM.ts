import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { RecordItem } from '@/models/recordModel';

interface CategoryTotal {
  catId: number;
  catName: string;
  total: number;
}

export const useCategoryRecordViewModel = () => {
  const records = useSelector((state: RootState) => state.record);
  const categories = useSelector((state: RootState) => state.category);

  const catMap = useMemo(() => {
    return categories.reduce((acc, cat) => {
      acc[cat.id] = cat.name;
      return acc;
    }, {} as Record<number, string>);
  }, [categories]);

  const getExistingCats = (): [string, number][] => {
    const catIds = [...new Set(records.map(rec => rec.categoryId))];
    return catIds.map(id => [catMap[id] || 'Unknown', id]);
  }

  const getRecsByCat = (id: number): RecordItem[] | undefined => {
    return records.filter((rec) => rec.categoryId === id);
  }

  const getTotalsGroupByCat = (id: number): CategoryTotal[] => {
    const totalsMap: Record<number, number> = {};

    records.forEach(rec => {
      totalsMap[rec.categoryId] = (totalsMap[rec.categoryId] || 0) + Number(rec.amount) * Number(rec.type || 1);
    });

    return Object.entries(totalsMap).map(([categoryIdStr, total]) => {
      const catId = Number(categoryIdStr);
      const catName = catMap[catId] || 'Unknown';
      return {
        catId,
        catName,
        total
      };
    });
  }

  const getTotalByCat = (id: number): CategoryTotal => {
    const total = records
      .filter(rec => rec.categoryId === id)
      .reduce((sum, rec) => sum + Number(rec.amount) * Number(rec.type || 1), 0);

    const catName = catMap[id] || 'Unknown';
    return {
      catId: id,
      catName,
      total
    };
  }

  return {
    getExistingCategories: getExistingCats,
    getRecordsByCategory: getRecsByCat,
    getTotalsGroupByCategory: getTotalsGroupByCat,
    getTotalByCategory: getTotalByCat,
    categoryIdMap: catMap
  };
};

