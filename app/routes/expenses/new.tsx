import { Form } from "@remix-run/react";

const AddNewExpensePage = () => {
  return (
    <Form className="flex flex-col items-center gap-4">
      <label className="flex flex-col gap-1">
        <span>Title</span>
        <input
          name="title"
          type="text"
          placeholder="Expense Title"
          className="rounded-full"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span>Amount</span>
        <input
          name="amount"
          type="number"
          placeholder="Expense Title"
          className="rounded-full"
        />
      </label>
      <button className="text-white px-6 py-3 rounded-full bg-gray-500 font-semibold">
        Save Expense
      </button>
    </Form>
  );
};

export default AddNewExpensePage;
