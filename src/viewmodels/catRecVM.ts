import { useSelector } from 'react-redux';
import { useMemo } from 'react';

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

  const getTotalsGroupByCat = (id: number): CategoryTotal[] => {
    const totalsMap: Record<number, number> = {};

    records.forEach(rec => {
      totalsMap[rec.categoryId] = (totalsMap[rec.categoryId] || 0) + Number(rec.amount);
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
      .reduce((sum, rec) => sum + Number(rec.amount), 0);

    const catName = catMap[catId] || 'Unknown';
    return {
      catId: id,
      catName,
      total
    };
  }

  return {
    getExistingCategories: getExistingCats,
    getTotalsGroupByCategory: getTotalsGroupByCat,
    getTotalByCategory: getTotalByCat,
  };
};

