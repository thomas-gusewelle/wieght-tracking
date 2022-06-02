import { useEffect, useState } from "react";
import { supabase } from "../../../utils/supabaseClient";

import Modal from "../modal";
import WeightForm from "../forms/weight-form";
import DeleteItemConfirmaton from "../forms/delete-item-confirmation";
import EditWeight from "../forms/edit-weight";
import { CircularProgress } from "@mui/material";

const WeightHistory = ({ data, getUserWeights, setIsLoading }) => {
  console.log(data);
  //States for updating an entry
  //Weight is the entire weight object and not just the numeric value
  const [weight, setWeight] = useState(null);
  const [showEdit, setShowEdit] = useState(false);

  //States for deleting an entry
  const [showDeleteConfrim, setShowDeleteConfrim] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [deleteItem, setDeleteItem] = useState(false);

  const handleEdit = (item) => {
    //const item = data.find(e => e.id === id);
    setWeight(item);
    setShowEdit(true);
  };

  const deleteConfirmation = (id) => {
    setDeleteItemId(id);
    setShowDeleteConfrim(true);
  };

  useEffect(() => {
    const handleDelete = async (id) => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("weight")
        .delete()
        .eq("id", id);
      getUserWeights();
      setDeleteItemId(null);
      onDeleteClose(false);
      setIsLoading(false);
      setDeleteItem(false);
    };
    if (deleteItem) {
      handleDelete(deleteItemId);
    }
  }, [deleteItem, deleteItemId, getUserWeights, setIsLoading]);

  const onDeleteClose = () => {
    setShowDeleteConfrim(false);
  };

  const onEditClose = () => {
    setShowEdit(false);
  };

  if (data == undefined) {
    <div></div>;
  } else {
    return (
      <div className='mt-6'>
        {showDeleteConfrim && (
          <Modal open={showDeleteConfrim} onClose={onDeleteClose}>
            <DeleteItemConfirmaton
              onClose={onDeleteClose}
              setDeleteItem={setDeleteItem}></DeleteItemConfirmaton>
          </Modal>
        )}

        {showEdit && (
          <Modal open={showEdit} onClose={onEditClose}>
            <EditWeight
              onClose={onEditClose}
              weightObject={weight}
              getUserWeights={getUserWeights}
              setIsLoading={setIsLoading}
            />
          </Modal>
        )}

        {/* <h1 className="text-center text-white text-3xl mb-8">History</h1> */}
        <div className='container mx-auto'>
          <table className='table-auto w-full max-w-screen-lg mx-auto border-collapse border border-stone-700 text-white'>
            <thead>
              <tr>
                <th className='border border-stone-700'>Date</th>
                <th className='border border-stone-700'>Time</th>
                <th className='border border-stone-700'>Weight</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody className=''>
              {data.map((data) => {
                const unformatedDate = new Date(data.created_at);
                const formatedDated = unformatedDate.toLocaleDateString(
                  undefined,
                  { day: "numeric", month: "long", year: "numeric" }
                );
                const formatedTime = unformatedDate.toLocaleTimeString(
                  undefined,
                  { hour: "numeric", minute: "numeric" }
                );

                return (
                  <tr key={data.id}>
                    <td className=' text-center p-4 border border-stone-700'>
                      {formatedDated}
                    </td>
                    <td className='text-center px-4 border border-stone-700'>
                      {formatedTime}
                    </td>
                    <td className='text-center px-4 border border-stone-700'>
                      {data.weight}
                    </td>
                    <td className='border border-stone-700'>
                      <div className='flex justify-center px-2'>
                        {/* <button 
                                        className="bg-red-500 px-2 py-1 mx-2 rounded-xl min-w-[4rem]"
                                        onClick={() => deleteConfirmation(data.id)}>
                                        Delete
                                        </button> */}

                        <button
                          className='bg-green-500 px-2 py-1 rounded-xl min-w-[4rem]'
                          onClick={() => handleEdit(data)}>
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
};

export default WeightHistory;
