<template>
    <div class="row mt-3">
        <div class="col-6">
            <div class="row m-1">
                <div class="col">
                    <ul class="nav nav-pills">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#">Карта</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link disabled" href="#">Видео</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link disabled">Лидар</a>
                        </li>

                    </ul>
                </div>
            </div>
            <img class="img-fluid rounded-4 h-75 mt-2" src="/map_placeholder.png" />
        </div>
        <div class="col-6">
            <h2>Роботы</h2>
            <table class="table bg-light text-black rounded-2 shadow-sm">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Название</th>
                        <th scope="col">Статус</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>БКМ 1</td>
                        <td class="table-success">Уборка</td>
                        <td class="text-center"><RouterLink to="robot"><button class="btn btn-primary">Подробнее</button></RouterLink></td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>БКМ 2
                        </td>
                        <td  class="table-warning">Нет соединения</td>
                        <td class="text-center"><button class="btn  btn-primary disabled">Подробнее</button></td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>БКМ 3</td>
                        <td class="table-warning" >Нет соединения</td>
                        <td class="text-center"><button class="btn disabled  btn-primary">Подробнее</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

</template>