export interface Plan {
	id: number;
	customer_id: number;
	plan_type: string;
	credit: number;
	spent_limit: number;
	account_limit: number;
	created_at: string;
	update_at: string;
}
