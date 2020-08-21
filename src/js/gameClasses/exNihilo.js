export class ExNihilo
{
	init(x, y)
	{
		this.cells = [];
		this.nbActionOnStartupDefault = 2;

		for (let i = 0; i < x; i++)
		{
			this.cells[i] = [];
			for (let j = 0; j < y; j ++)
				this.cells[i][j] = 'cell';
		}
		console.log(this);
	}
}