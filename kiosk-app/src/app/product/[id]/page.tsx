import { notFound } from 'next/navigation';
import { getProductByIdAsync } from '@/lib/productUtils';
import { ProductDetailsLayout } from '@/components/product/ProductDetailsLayout';

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const data = await getProductByIdAsync(resolvedParams?.id);
  
  if (!data) {
    notFound();
  }

  return <ProductDetailsLayout data={data} />;
}
