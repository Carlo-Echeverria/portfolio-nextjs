export default async function Home({ data }: { data: any }) {

  const { attributes, relationships } = data;

  return (
    <main className="max-w-4xl mx-auto p-8 space-y-6">
      <section className="text-center">
        <img
          src={`${relationships.field_photo.url}`}
          // alt={relationships.field_photo.data.meta.alt}
          className="w-32 h-32 rounded-full mx-auto shadow-lg bg-gray-50"
        />
        <h1 className="text-3xl font-bold mt-4">{attributes.title}</h1>
        <h2 className="text-xl text-gray-600 mt-2">{attributes.field_title}</h2>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-2">Resumen</h3>
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: attributes.body.value }}
        />
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold">Email</h4>
          <p>{attributes.field_email}</p>
        </div>
        <div>
          <h4 className="font-semibold">Teléfono</h4>
          <p>{attributes.field_phone}</p>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-2">Habilidades</h3>
        <ul className="list-disc list-inside text-gray-700">
          {relationships.field_skills.data.map((skill, idx) => (
            <li key={idx}>Skill ID: {skill.meta.drupal_internal__target_id}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-2">Proyectos</h3>
        <ul className="list-disc list-inside text-gray-700">
          {relationships.field_projects.data.map((project, idx) => (
            <li key={idx}>Proyecto ID: {project.meta.drupal_internal__target_id}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
