import projectsJson from '../data/products/index.json';

export interface ProductDto {
	ProductID: number;
	ProductName: string;
	UnitPrice: number;
	UnitsInStock: number;
}

export const getProducts = () => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(projectsJson as ProductDto[]);
		}, 500);
	});
};
