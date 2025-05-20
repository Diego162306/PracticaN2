package practica.primera.com.base.controller;

import java.io.FileNotFoundException;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;
import java.util.Scanner;

import java.io.File;

import practica.primera.com.base.controller.DataStruc.List.Linkendlist;
import practica.primera.com.base.controller.excepcion.ListEmptyException;

public class PrimeraParte {
    private Integer[] matriz;
    private Linkendlist<Integer> lista;

    public static LinkedList<Integer> extractData(String filePath) {
        LinkedList<Integer> lista = new LinkedList<>();
        try (Scanner scanner = new Scanner(new File(filePath))) {
            while (scanner.hasNext()) {
                if (scanner.hasNextInt()) {
                    lista.add(scanner.nextInt());
                } else {
                    scanner.next();
                }
            }
        } catch (FileNotFoundException e) {
            System.out.println("Archivo no encontrado: " + filePath);
        }
        return lista;
    }

    private Boolean verificar_numero_arreglo(Integer a) {
        int cont = 0;
        Boolean band = false;
        for (int i = 0; i < matriz.length; i++) {
            if (a.intValue() == matriz[i].intValue())
                cont++;
            if (cont >= 2) {
                band = true;
                break;
            }
        }
        return band;
    }

    public String[] verificar_arreglo() {
        StringBuilder resp = new StringBuilder();
        for (int i = 0; i < matriz.length; i++) {
            if (verificar_numero_arreglo(matriz[i]))
                resp.append(matriz[i].toString()).append("-");
        }
        return resp.toString().split("-");
    }

    public Linkendlist<Integer> verificar_lista() throws ListEmptyException {
        Integer[] datos = lista.toArray();

        Map<Integer, Integer> contador = new HashMap<>();
        for (Integer v : datos) {
            contador.put(v, contador.getOrDefault(v, 0) + 1);
        }

        Linkendlist<Integer> resp = new Linkendlist<>();
        for (Integer v : datos) {
            if (contador.get(v) >= 2) {
                resp.add(v);
                contador.put(v, 0);
            }
        }

        return resp;
    }

    public static void main(String[] args) throws ListEmptyException {
        PrimeraParte p = new PrimeraParte();
        String filePath = "src/Data.txt";
        LinkedList<Integer> datos = extractData(filePath);
    
        // Inicializar arreglo y lista enlazada
        p.matriz = datos.toArray(new Integer[0]);
        p.lista = new Linkendlist<>();
        for (Integer dato : datos) {
            p.lista.add(dato);
        }
    
        // Variables para medir tiempos
        long[] tiemposArreglo = new long[3];
        long[] tiemposLista = new long[3];
    
        for (int i = 0; i < 3; i++) {
            // Medir tiempo para el arreglo
            long inicioArreglo = System.currentTimeMillis();
            String[] repetidosArreglo = p.verificar_arreglo();
            long finArreglo = System.currentTimeMillis();
            tiemposArreglo[i] = finArreglo - inicioArreglo;
    
            // Crear conjunto para eliminar duplicados
            java.util.Set<String> unicosRepetidosArreglo = new java.util.HashSet<>(java.util.Arrays.asList(repetidosArreglo));
    
            // Medir tiempo para la lista enlazada
            long inicioLista = System.currentTimeMillis();
            Linkendlist<Integer> repetidosLista = p.verificar_lista();
            long finLista = System.currentTimeMillis();
            tiemposLista[i] = finLista - inicioLista;
    
            // Mostrar resultados de la iteración
            System.out.println("Iteración " + (i + 1) + ":");
            System.out.println("Repetidos en arreglo (" + unicosRepetidosArreglo.size() + "): " + String.join(", ", unicosRepetidosArreglo));
            System.out.println("Repetidos en lista enlazada (" + repetidosLista.size() + ") ");
            System.out.println();
        }
    
        // Mostrar tabla comparativa
        System.out.println("Tabla comparativa de tiempos (ms):");
        System.out.println("Iteración\tArreglo\tLista Enlazada");
        for (int i = 0; i < 3; i++) {
            System.out.println((i + 1) + "\t\t" + tiemposArreglo[i] + "\t" + tiemposLista[i]);
        }
    }
    
}