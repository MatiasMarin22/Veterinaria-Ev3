import { edit, getData, remove, save, selectOne } from "./firestore.js"

let id = 0

document.getElementById('btnGuardar').addEventListener('click', () => {
    document.querySelectorAll('.form-control').forEach(item => {
        verificar(item.id)
    })
    if (document.querySelectorAll('.is-invalid').length == 0) {
        const mascota = {
            nombreMascota: document.getElementById('nombreMascota').value.trim(),
            especie: document.getElementById('especie').value.trim(),
            raza: document.getElementById('raza').value.trim(),
            edadAnos: document.getElementById('edadAnos').value,
            edadMeses: document.getElementById('edadMeses').value,
            peso: document.getElementById('peso').value,
            nombreDueno: document.getElementById('nombreDueno').value.trim(),
            emailDueno: document.getElementById('emailDueno').value,
            rutDueno: document.getElementById('rutDueno').value,
            telefonoDueno: document.getElementById('telefonoDueno').value
        }

        if (document.getElementById('btnGuardar').value == 'Guardar') {
            save(mascota)
        } else {
            edit(id, mascota)
            id = 0
        }

        limpiar()
    }
})

window.addEventListener('DOMContentLoaded', () => {
    getData((datos) => {
        let tabla = ''

        datos.forEach((doc) => {
            const item = doc.data()

            tabla += `<tr>
            <td>${item.nombreMascota}</td>
            <td>${item.especie}</td>
            <td>${item.raza}</td>
            <td>${item.edadAnos} años</td>
            <td>${item.edadMeses} meses</td>
            <td>${item.peso} kg</td>
            <td>${item.nombreDueno}</td>
            <td>${item.emailDueno}</td>
            <td>${item.rutDueno}</td>
            <td>${item.telefonoDueno}</td>
            <td nowrap>
                <button class="btn btn-warning" id="${doc.id}">Editar</button>
                <button class="btn btn-danger" id="${doc.id}">Eliminar</button>
            </td>
        </tr>`
        })

        document.getElementById('contenido').innerHTML = tabla
        document.querySelectorAll('.btn-danger').forEach(btn => {
            btn.addEventListener('click', () => {
                Swal.fire({
                    title: "¿Está seguro que desea eliminar el registro?",
                    text: "No podrá revertir los cambios",
                    icon: "error",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Eliminar"
                }).then((result) => {
                    if (result.isConfirmed) {
                        remove(btn.id)
                        Swal.fire({
                            title: "Eliminado!",
                            text: "Su registro ha sido eliminado!",
                            icon: "success"
                        })
                    }
                })
            })
        })
        document.querySelectorAll('.btn-warning').forEach(btn => {
            btn.addEventListener('click', async () => {
                const mascota = await selectOne(btn.id)
                const m = mascota.data()

                document.getElementById('nombreMascota').value = m.nombreMascota
                document.getElementById('especie').value = m.especie
                document.getElementById('raza').value = m.raza
                document.getElementById('edadAnos').value = m.edadAnos
                document.getElementById('edadMeses').value = m.edadMeses
                document.getElementById('peso').value = m.peso
                document.getElementById('nombreDueno').value = m.nombreDueno
                document.getElementById('emailDueno').value = m.emailDueno
                document.getElementById('rutDueno').value = m.rutDueno
                document.getElementById('telefonoDueno').value = m.telefonoDueno

                document.getElementById('btnGuardar').value = 'Editar'
                document.getElementById('nombreMascota').readOnly = true

                id = mascota.id
            })
        })
    })
})
