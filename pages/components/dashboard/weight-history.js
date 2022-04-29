import { useEffect, useState } from "react";
import { supabase } from "../../../utils/supabaseClient";

import Modal from "../modal";
import WeightForm from "../forms/weight-form";
import DeleteItemConfirmaton from "../forms/delete-item-confirmation";

const WeightHistory = ({data, getUserWeights, setIsLoading}) => {
    const [showDeleteConfrim, setShowDeleteConfrim] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);
    const [deleteItem, setDeleteItem] = useState(false);


    const handleEdit = (id) => {
        const item = data.find(e => e.id === id);
        
    }

    const deleteConfirmation = (id) => {
        setDeleteItemId(id);
        setShowDeleteConfrim(true);
        
 
    }

    const handleDelete = async (id) => {
        setIsLoading(true);
        const {data, error} = await supabase
            .from('weight')
            .delete()
            .eq('id', id);
            console.log(error)
        getUserWeights();
        setDeleteItemId(null);
        onClose();
        setIsLoading(false);
        setDeleteItem(false);
    }

    useEffect(() => {
        console.log(deleteItem);
        if (deleteItem){
            handleDelete(deleteItemId);
        }
    }, [deleteItem])

    const onClose = () => {
        setShowDeleteConfrim(false);
    }



    if (data.length === 0){
        return (
            <div></div>
        )
    } else {
        return (
            <div className="mt-6">

                {showDeleteConfrim &&
                    <Modal open={showDeleteConfrim} onClose={onClose}>
                        <DeleteItemConfirmaton
                        onClose={onClose}
                        setDeleteItem={setDeleteItem}>

                        </DeleteItemConfirmaton>
                    </Modal>
                }

                <h1 className="text-center text-white text-xl">History</h1>
                <table className="table-auto mx-auto border- text-white">
                    <thead>
                        <tr>
                           <th>Date</th>
                           <th>Weight</th> 
                           <th></th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {data.map((data) => {
                            var unformatedDate = new Date(data.created_at);
                            const formatedDated = unformatedDate.toLocaleDateString(undefined, {day: 'numeric', month: "long", year: "numeric"})
                            
                            
                            
                            return (
                                <tr>
                                <td className="p-4">{formatedDated}</td>
                                <td className="text-center px-4">{data.weight}</td>
                                <td>
                                    <button 
                                    className="bg-red-500 px-2 py-1 mx-2 rounded-xl min-w-[4rem]"
                                    onClick={() => deleteConfirmation(data.id)}>
                                    Delete
                                    </button>
                                </td>
                                <td>
                                    <button 
                                    className="bg-green-500 px-2 py-1 rounded-xl min-w-[4rem]"
                                    onClick={() => handleEdit(data.id)}>
                                    Edit
                                    </button>
                                </td>
                            </tr>
                        
                            )
        
                        })}
                    </tbody>
                </table>
            </div>
        )
    }


}

export default WeightHistory

