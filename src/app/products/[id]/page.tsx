export default async function Product({ params }: { params: { id: string } }) {
  const { id } = await params; //dynamic api(params) is async
  return <h1>Product: {id}</h1>;
}

/*Note: The route products/[id]  allows us to render the same product page with different id's
http://localhost:3000/products/android  or http://localhost:3000/products/noodle
This default function will be rendered and the product id android or noodle will be fetched from
the params and rendered in the h1 tags
*/
