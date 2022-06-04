interface PaginateData {
  page: number;
  per_page: number;
  prev_page: number;
  next_page: number;
  total: number;
  total_pages: number;
  data: any[];
}

export default PaginateData;
