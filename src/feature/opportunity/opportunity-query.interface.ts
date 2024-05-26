export interface OpportunityQuery {
  q?: string;
  category_id?: number;
  country?: string;
  city?: string;
  tag_ids?: number[];
}
