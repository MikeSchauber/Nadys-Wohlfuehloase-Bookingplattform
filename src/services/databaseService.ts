import { supabase } from "@/supabase/supabase";

export const getTableData = async (
  table: string,
  orderedBy: string,
  asc: boolean,
  filterColumn?: string,
  filterValue?: string | number,
  queryString?: string,
) => {
  const { data, error } = await createQuery(table, orderedBy, asc, filterColumn, filterValue, queryString);

  await refactorDates(data);

  if (error) throw error;
  return data;
};

async function createQuery(
  table: string,
  orderedBy: string,
  asc: boolean,
  filterColumn?: string,
  filterValue?: string | number,
  queryString?: string,
) {
  let query = supabase.from(table).select("*");

  if (queryString) {
    query = supabase.from(table).select(queryString);
  }

  query = query.order(orderedBy, { ascending: asc });

  if (filterColumn && filterValue !== undefined) {
    query = query.eq(filterColumn, filterValue);
  }

  return query;
}

export const refactorDates = async (array: any) => {
  array.forEach((element: any) => {
    const rawDate = element.created_at;
    const dateObject = new Date(rawDate);
    element.created_at = dateObject.toLocaleDateString("de-DE");
  });
};
