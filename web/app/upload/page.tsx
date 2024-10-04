import CreateTelecomForm from './_form/create-telecom.form';

export default function Home() {
  return (
    <div className="min-h-screen flex h-full flex-col gap-24 justify-center max-w-2xl mx-auto font-sans">
      <h1 className="font-semibold text-6xl text-center">
        Upload your csv file
      </h1>
      <div className="w-full flex px-8 justify-between ">
        <CreateTelecomForm />
      </div>
    </div>
  );
}
