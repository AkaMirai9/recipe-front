interface Recipe {
  id: number;
  name: string;
  description: String;
  ingredients: string[];
  instructions: string;
  createdAt: Date;
  updatedAt: Date;
}

export default Recipe;
