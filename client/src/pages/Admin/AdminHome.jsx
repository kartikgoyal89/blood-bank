import React from "react";
import Layout from "./../../components/shared/Layout/Layout";
import { useSelector } from "react-redux";

const AdminHome = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <Layout>
      <div className="container">
        <div className="d-flex flex-column mt-4">
          <h1>
            Welcome Admin <i className="text-success ">{user?.name}</i>
          </h1>
          <h5>Manage Blood Bank App</h5>
          <hr />
          <p className="mt-5 admin-desc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
            mollitia iste nobis incidunt illum maiores nostrum, amet qui alias
            iure porro aut consequatur nemo dicta labore, perspiciatis,
            voluptates saepe. Nihil ratione incidunt fugiat consequatur
            quibusdam doloremque nisi aspernatur illum quisquam ducimus, dolor
            soluta, corrupti, vero optio perspiciatis aperiam laudantium fuga
            quos voluptas doloribus temporibus? Accusamus veritatis laborum
            labore recusandae. Quis inventore consequatur rerum, blanditiis
            dicta deserunt eveniet odit asperiores iusto eos cum perspiciatis
            unde voluptas sint ratione harum nemo voluptates rem consectetur
            pariatur dolorum similique earum aliquid tempora! Ad, magni
            accusamus quas ex tempora quidem quisquam, vitae soluta voluptates
            nihil eveniet aliquam? Sunt, impedit asperiores. Porro mollitia
            nobis quas, possimus architecto excepturi cumque modi, neque,
            dolorem necessitatibus eius quidem asperiores tempore dolorum.
            Perspiciatis nobis aliquam soluta consectetur autem ducimus beatae,
            natus perferendis voluptates? Hic, unde sapiente eaque, odit
            suscipit reiciendis quae architecto laborum eum itaque illum aliquid
            deserunt, debitis sequi maiores quaerat eius? Reprehenderit ipsa
            provident quod rem! Libero, eum!
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AdminHome;
