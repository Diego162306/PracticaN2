package com.practica2.base.controller.Data_Struc.List;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class extracData {

    // Leer los datos desde el archivo y retornarlos como arreglo
    public int[] extractArrayFromFile(String filePath) {
        int count = countLines(filePath);
        int[] data = new int[count];
        int index = 0;

        try {
            Scanner scanner = new Scanner(new File(filePath));
            while (scanner.hasNextLine()) {
                data[index++] = Integer.parseInt(scanner.nextLine().trim());
            }
            scanner.close();
        } catch (FileNotFoundException e) {
            System.out.println("Archivo no encontrado: " + filePath);
        }

        return data;
    }

    // Contar líneas del archivo
    private int countLines(String filePath) {
        int count = 0;
        try {
            Scanner scanner = new Scanner(new File(filePath));
            while (scanner.hasNextLine()) {
                scanner.nextLine();
                count++;
            }
            scanner.close();
        } catch (FileNotFoundException e) {
            System.out.println("Archivo no encontrado: " + filePath);
        }
        return count;
    }

    // Convertir un arreglo en lista enlazada
    public Linkendlist<Integer> arrayToList(int[] array) {
        Linkendlist<Integer> list = new Linkendlist<>();
        for (int value : array) {
            list.add(value);
        }
        return list;
    }

    // Buscar elementos duplicados en el arreglo
    private int countDuplicatesArray(int[] array) {
        int count = 0;
        for (int i = 0; i < array.length; i++) {
            int val = array[i];
            int rep = 0;
            for (int j = 0; j < array.length; j++) {
                if (array[j] == val) rep++;
            }
            if (rep > 1) {
                count++;
            }
        }
        return count;
    }

    // Buscar duplicados en la lista enlazada
    public int countDuplicatesList(Linkendlist<Integer> list) throws Exception {
        int count = 0;
        for (int i = 0; i < list.getLength(); i++) {
            int current = list.get(i);
            int rep = 0;
            for (int j = 0; j < list.getLength(); j++) {
                if (list.get(j).equals(current)) {
                    rep++;
                }
            }
            if (rep > 1) {
                count++;
            }
        }
        return count;
    }

    // Método principal para ejecutar el proceso y comparar rendimiento
    public void runComparison(String filePath) {
        long[] tiemposArreglo = new long[3];
        long[] tiemposLista = new long[3];

        for (int i = 0; i < 3; i++) {
            System.out.println("Iteración " + (i + 1));

            // Arreglo
            long inicioArray = System.currentTimeMillis();
            int[] arreglo = extractArrayFromFile(filePath);
            int duplicadosArr = countDuplicatesArray(arreglo);
            long finArray = System.currentTimeMillis();
            tiemposArreglo[i] = finArray - inicioArray;

            // Lista
            long inicioLista = System.currentTimeMillis();
            Linkendlist<Integer> lista = arrayToList(arreglo);
            int duplicadosLista = 0;
            try {
                duplicadosLista = countDuplicatesList(lista);
            } catch (Exception e) {
                System.out.println("Error procesando la lista: " + e.getMessage());
            }
            long finLista = System.currentTimeMillis();
            tiemposLista[i] = finLista - inicioLista;

            System.out.println("  - Duplicados (arreglo): " + duplicadosArr);
            System.out.println("  - Duplicados (lista):   " + duplicadosLista);
            System.out.println("  - Tiempo arreglo: " + tiemposArreglo[i] + " ms");
            System.out.println("  - Tiempo lista:   " + tiemposLista[i] + " ms");
            System.out.println();
        }

        // Tabla comparativa
        long promedioArr = (tiemposArreglo[0] + tiemposArreglo[1] + tiemposArreglo[2]) / 3;
        long promedioList = (tiemposLista[0] + tiemposLista[1] + tiemposLista[2]) / 3;

        System.out.println("Comparación de tiempos");
        System.out.println("Iteración | Arreglo (ms) | Lista Enlazada (ms)");
        for (int i = 0; i < 3; i++) {
            System.out.printf("    %d     |     %d      |        %d%n", i + 1, tiemposArreglo[i], tiemposLista[i]);
        }
        System.out.println("----------------------------------------------");
        System.out.printf(" Promedio |     %d      |        %d%n", promedioArr, promedioList);
    }

    public static void main(String[] args) {
        extracData extractor = new extracData();
        String filePath = "src/archivo.txt";
        extractor.runComparison(filePath);
    }
}
