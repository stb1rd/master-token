import AuthForm from '@/components/AuthForm';

export default function Home() {
  return (
    <div className="prose max-w-md mx-auto">
      <h1>CMS Auth</h1>
      <AuthForm />
    </div>
  );
}
