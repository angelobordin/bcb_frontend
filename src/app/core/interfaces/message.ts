export interface Message {
	id: number;
	customer_id: number;
	text: string;
	value: string;
	created_at: string;
	update_at: string;
	customer: {
		cnpj: string;
	};
}
