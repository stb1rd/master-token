// @ts-nocheck
'use client';
import { createClientComponentClient, Session } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import LaunchIcon from '@mui/icons-material/Launch';
import { ProductForm } from '@/components/ProductForm';
import { useCallback, useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

export default function Index() {
  const supabase = createClientComponentClient();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const getProducts = useCallback(async () => {
    try {
      const { data } = await supabase.from('products').select();
      setProducts(data);
    } catch (e) {
      console.log(e);
    }
  }, [supabase]);

  useEffect(() => {
    getProducts();
  }, []);

  const handleDelete = async (product) => {
    console.log('product', product);
    await supabase.from('products').delete().eq('id', product.id);
    getProducts();
  };

  return (
    <div className="prose mx-auto">
      <h1>CMS</h1>
      <div className="text-sm breadcrumbs">
        <ul className="pl-0">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>Content Management</li>
        </ul>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <tbody>
            {products?.map((product) => (
              <tr key={product.id} className="hover">
                <td>{product.name}</td>
                <td className="flex gap-1 justify-end">
                  <button className="btn btn-sm">
                    <Link href={`/catalog/${product.id}`}>
                      <LaunchIcon fontSize="small" />
                    </Link>
                  </button>
                  <button
                    className="btn btn-sm"
                    onClick={() => {
                      setSelectedProduct(product);
                      document.getElementById('product_form').showModal();
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </button>
                  <button className="btn btn-sm" onClick={() => handleDelete(product)}>
                    <DeleteIcon fontSize="small" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center">
        <button
          className="btn btn-wide"
          onClick={() => {
            setSelectedProduct(null);
            document.getElementById('product_form').showModal();
          }}
        >
          Add new
        </button>
      </div>
      <dialog id="product_form" className="modal">
        <div className="modal-box  max-w-3xl">
          <div className="flex items-center justify-between">
            <h2 className="m-0">Product form</h2>
            <form method="dialog">
              <button className="btn">
                <CloseIcon />
              </button>
            </form>
          </div>
          <ProductForm
            product={selectedProduct}
            onSuccess={() => {
              getProducts();
              document.getElementById('product_form').close();
            }}
          />
        </div>
      </dialog>
    </div>
  );
}
