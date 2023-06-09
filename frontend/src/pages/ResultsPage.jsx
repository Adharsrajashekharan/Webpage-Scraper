import axios from "axios";
import React, { useEffect, useState } from "react";
import { message } from "antd";
import { Button, Popconfirm } from "antd";
import { useNavigate } from "react-router-dom";

const ResultsPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [render, setRender] = useState("");

  useEffect(() => {
    getData();
  }, [render]);

  const cancel = (e) => {
    console.log(e);
    message.error("Deletion cancelled");
  };

  const Addtofav = async (id) => {
    try {
      await axios.put(`/api/url/${id}`);
      setRender((prev) => !prev);
      message.success("Item Added to favorites");
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  const remfav = async (id) => {
    try {
      await axios.put(`/api/url/${id}`);
      setRender((prev) => !prev);
      message.warning("Item removed from favorites");
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  const Deletedata = async (id) => {
    const res = await axios.delete(`/api/url/${id}`);
    setRender(res);
    message.success("Item deleted");
  };
  async function getData() {
    try {
      const res = await axios.get("/api/url");
      setData(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <div className="w-full bg-red-50">
      <div className="container mx-auto">
        <div className="flex justify-between p-6">
          <h1 className="text-2xl font-bold">Results</h1>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-700 w-32 text-white font-bold"
          >
            Add url
          </button>
        </div>
        {data.length?
        <table className="w-full bg-slate-200">
          <thead>
            <tr className="bg-black text-white">
              <th className="px-4 py-2 w-10">#</th>
              <th className="px-4 py-2 w-40">Domain Name</th>
              <th className="px-4 py-2 w-20">Word Count</th>
              <th className="px-4 py-2 w-20">Favourite</th>
              <th className="px-4 py-2 w-40">Media URLs</th>
              <th className="px-4 py-2 w-40">Web URLs</th>
              <th className="px-4 py-2 w-40">Actions</th>
            </tr>
          </thead>
           
          <tbody>
            {data.map((item, index) => (
              <tr key={item._id}>
                <td className="border border-black px-4 py-2 align-top">
                  {index + 1}
                </td>
                <td className="border border-black px-4 py-2 align-top">
                  {item.domain}
                </td>
                <td className="border border-black px-4 py-2 align-top">
                  {item.wordCount}
                </td>
                <td className="border border-black px-4 py-2 align-top">
                  {item.favourites ? "True" : "False"}
                </td>
                <td className="border border-black px-4 py-2 align-top">
                  {item.mediaUrls && (
                    <ul>
                      {item.mediaUrls.map((url, index) => (
                        <li key={index}>{url}</li>
                      ))}
                    </ul>
                  )}
                </td>
                <td className="border border-black px-4 py-2 align-top" style={{ wordBreak:"break-word",width:"300px" }}>
                  <ul>
                    {item.webLinks.map((link, index) => (
                      <li key={index}>{link}</li>
                    ))}
                  </ul>
                </td>
                <td className="border border-black px-4 py-2 gap-4 align-top">
                  {item.favourites ? (
                    <button
                      onClick={() => remfav(item._id)}
                      className="px-4 py-2 w-40 bg-red-500 text-white rounded mb-6"
                    >
                      Remove from favorites
                    </button>
                  ) : (
                    <button
                      onClick={() => Addtofav(item._id)}
                      className="px-4 py-2 w-40 bg-green-500 text-white rounded mb-6"
                    >
                      Add to favorites
                    </button>
                  )}

                  <Popconfirm
                    title="Delete the task"
                    description="Are you sure to delete this task?"
                    onConfirm={() => Deletedata(item._id)}
                    onCancel={cancel}
                    okText={<span className="text-black">Yes</span>}
                    cancelText="No"
                  >
                    <Button className="items-center text-lg mr-2 w-40 bg-red-500 text-white rounded">
                      Delete
                    </Button>
                  </Popconfirm>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
            :
             <div className=" border items-center justify-center h-auto w-auto text-center ">
            <div className="bg-white p-6 rounded-lg shadow-xl">
              <p className="text-2xl font-semibold">List is empty</p><br />
              <p className="text-2xl font-semibold">Add Url to populate the list</p><br />

            </div>
          </div>}
      </div>
    </div>
  );
};

export default ResultsPage;
