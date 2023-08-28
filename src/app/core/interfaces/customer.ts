export interface Customer {
	id: number;
	name: string;
	cnpj: string;
	responsible_name: string;
	responsible_email: string;
	responsible_cpf: string;
	responsible_cellphone: string;
	created_at: string;
	update_at: string;
	customer: {
		cnpj: string;
	};
}
