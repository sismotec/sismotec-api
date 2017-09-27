-- --------------------------------------------------------
-- Host:                         us-cdbr-iron-east-05.cleardb.net
-- Versión del servidor:         5.6.36-log - MySQL Community Server (GPL)
-- SO del servidor:              Linux
-- HeidiSQL Versión:             9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Volcando estructura de base de datos para heroku_baf49ff38aac61a
CREATE DATABASE IF NOT EXISTS `heroku_baf49ff38aac61a` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `heroku_baf49ff38aac61a`;

-- Volcando estructura para tabla heroku_baf49ff38aac61a.beneficiario
CREATE TABLE IF NOT EXISTS `beneficiario` (
  `id` int(1) NOT NULL AUTO_INCREMENT,
  `nombre_Instituto` varchar(50) NOT NULL DEFAULT '0',
  `celular` varchar(50) NOT NULL DEFAULT '0',
  `latitud` double NOT NULL DEFAULT '0',
  `longitud` double NOT NULL DEFAULT '0',
  `password` varchar(50) NOT NULL DEFAULT '0',
  `nombre_Responsable` varchar(50) NOT NULL DEFAULT '0',
  `email` varchar(50) NOT NULL,
  `estado` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla heroku_baf49ff38aac61a.beneficiario: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `beneficiario` DISABLE KEYS */;
INSERT INTO `beneficiario` (`id`, `nombre_Instituto`, `celular`, `latitud`, `longitud`, `password`, `nombre_Responsable`, `email`, `estado`) VALUES
	(1, 'cruz roja', '8111274653', 18.7167, -99.1833, 'qwerty', 'Luis Robles', 'luis@gmail.com', 'morelos'),
	(11, 'caritas', '4921234576', 25.6667, -100.3167, '123123123', 'Laura Martinez', 'laur@caritas.com', 'monterrey');
/*!40000 ALTER TABLE `beneficiario` ENABLE KEYS */;

-- Volcando estructura para tabla heroku_baf49ff38aac61a.cantidad_acopio_recurso
CREATE TABLE IF NOT EXISTS `cantidad_acopio_recurso` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_recurso` int(11) DEFAULT NULL,
  `id_necesidad_acopio` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_cantidad_acopio_recurso_recurso` (`id_recurso`),
  KEY `FK_cantidad_acopio_recurso_necesidad_acopio` (`id_necesidad_acopio`),
  CONSTRAINT `FK_cantidad_acopio_recurso_necesidad_acopio` FOREIGN KEY (`id_necesidad_acopio`) REFERENCES `necesidad_acopio` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_cantidad_acopio_recurso_recurso` FOREIGN KEY (`id_recurso`) REFERENCES `recurso` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla heroku_baf49ff38aac61a.cantidad_acopio_recurso: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `cantidad_acopio_recurso` DISABLE KEYS */;
INSERT INTO `cantidad_acopio_recurso` (`id`, `id_recurso`, `id_necesidad_acopio`, `cantidad`) VALUES
	(1, 11, 1, 10);
/*!40000 ALTER TABLE `cantidad_acopio_recurso` ENABLE KEYS */;

-- Volcando estructura para tabla heroku_baf49ff38aac61a.cantidad_beneficiario_recurso
CREATE TABLE IF NOT EXISTS `cantidad_beneficiario_recurso` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cantidad` int(11) NOT NULL DEFAULT '0',
  `id_recurso` int(11) NOT NULL DEFAULT '0',
  `id_necesidad_beneficiario` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FK_cantidad_beneficiario_recurso_recurso` (`id_recurso`),
  KEY `FK_cantidad_beneficiario_recurso_necesidad_beneficiario` (`id_necesidad_beneficiario`),
  CONSTRAINT `FK_cantidad_beneficiario_recurso_necesidad_beneficiario` FOREIGN KEY (`id_necesidad_beneficiario`) REFERENCES `necesidad_beneficiario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_cantidad_beneficiario_recurso_recurso` FOREIGN KEY (`id_recurso`) REFERENCES `recurso` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla heroku_baf49ff38aac61a.cantidad_beneficiario_recurso: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `cantidad_beneficiario_recurso` DISABLE KEYS */;
/*!40000 ALTER TABLE `cantidad_beneficiario_recurso` ENABLE KEYS */;

-- Volcando estructura para tabla heroku_baf49ff38aac61a.categoria
CREATE TABLE IF NOT EXISTS `categoria` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `categoria` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla heroku_baf49ff38aac61a.categoria: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` (`id`, `categoria`) VALUES
	(1, 'alimento'),
	(11, 'herramienta'),
	(21, 'medicina');
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;

-- Volcando estructura para tabla heroku_baf49ff38aac61a.centro_de_acopio
CREATE TABLE IF NOT EXISTS `centro_de_acopio` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `latitud` double NOT NULL DEFAULT '0',
  `longitud` double NOT NULL DEFAULT '0',
  `organizacion` varchar(50) NOT NULL DEFAULT '0',
  `responsable` varchar(50) NOT NULL DEFAULT '0',
  `celular` varchar(50) NOT NULL DEFAULT '0',
  `horario` int(11) NOT NULL DEFAULT '0',
  `email` varchar(50) DEFAULT NULL,
  `estado` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_centro_de_acopio_horario` (`horario`),
  CONSTRAINT `FK_centro_de_acopio_horario` FOREIGN KEY (`horario`) REFERENCES `horario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla heroku_baf49ff38aac61a.centro_de_acopio: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `centro_de_acopio` DISABLE KEYS */;
INSERT INTO `centro_de_acopio` (`id`, `latitud`, `longitud`, `organizacion`, `responsable`, `celular`, `horario`, `email`, `estado`) VALUES
	(1, 25.6667, -100.3167, 'ITESM', 'Pedro Lopez', '8114239654', 1, 'pedro@itesm.mx', 'Monterrey');
/*!40000 ALTER TABLE `centro_de_acopio` ENABLE KEYS */;

-- Volcando estructura para tabla heroku_baf49ff38aac61a.favorito
CREATE TABLE IF NOT EXISTS `favorito` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_neces_benef` int(11) DEFAULT NULL,
  `id_centro_acopio` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_FAVORITO_necesidad_beneficiario` (`id_neces_benef`),
  KEY `FK_FAVORITO_centro_de_acopio` (`id_centro_acopio`),
  CONSTRAINT `FK_FAVORITO_centro_de_acopio` FOREIGN KEY (`id_centro_acopio`) REFERENCES `centro_de_acopio` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_FAVORITO_necesidad_beneficiario` FOREIGN KEY (`id_neces_benef`) REFERENCES `necesidad_beneficiario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla heroku_baf49ff38aac61a.favorito: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `favorito` DISABLE KEYS */;
/*!40000 ALTER TABLE `favorito` ENABLE KEYS */;

-- Volcando estructura para tabla heroku_baf49ff38aac61a.horario
CREATE TABLE IF NOT EXISTS `horario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `horaInicio` time NOT NULL DEFAULT '00:00:00',
  `horaFin` time NOT NULL DEFAULT '00:00:00',
  `dia` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla heroku_baf49ff38aac61a.horario: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `horario` DISABLE KEYS */;
INSERT INTO `horario` (`id`, `horaInicio`, `horaFin`, `dia`) VALUES
	(1, '08:40:00', '22:00:00', 'Lunes'),
	(11, '10:00:00', '19:00:00', 'Sabado');
/*!40000 ALTER TABLE `horario` ENABLE KEYS */;

-- Volcando estructura para tabla heroku_baf49ff38aac61a.inventario
CREATE TABLE IF NOT EXISTS `inventario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_recurso` int(11) DEFAULT '0',
  `id_centro_acopio` int(11) DEFAULT '0',
  `entradas` int(11) DEFAULT '0',
  `salidas` int(11) DEFAULT '0',
  `actual` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FK_inventario_recurso` (`id_recurso`),
  KEY `FK_inventario_centro_de_acopio` (`id_centro_acopio`),
  CONSTRAINT `FK_inventario_centro_de_acopio` FOREIGN KEY (`id_centro_acopio`) REFERENCES `centro_de_acopio` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_inventario_recurso` FOREIGN KEY (`id_recurso`) REFERENCES `recurso` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla heroku_baf49ff38aac61a.inventario: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `inventario` DISABLE KEYS */;
INSERT INTO `inventario` (`id`, `id_recurso`, `id_centro_acopio`, `entradas`, `salidas`, `actual`) VALUES
	(1, 1, 1, 40, 22, 18),
	(11, 11, 1, 55, 25, 30);
/*!40000 ALTER TABLE `inventario` ENABLE KEYS */;

-- Volcando estructura para tabla heroku_baf49ff38aac61a.necesidad_acopio
CREATE TABLE IF NOT EXISTS `necesidad_acopio` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_centroAcopio` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_necesidad_acopio_centro_de_acopio` (`id_centroAcopio`),
  CONSTRAINT `FK_necesidad_acopio_centro_de_acopio` FOREIGN KEY (`id_centroAcopio`) REFERENCES `centro_de_acopio` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla heroku_baf49ff38aac61a.necesidad_acopio: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `necesidad_acopio` DISABLE KEYS */;
INSERT INTO `necesidad_acopio` (`id`, `id_centroAcopio`) VALUES
	(1, 1);
/*!40000 ALTER TABLE `necesidad_acopio` ENABLE KEYS */;

-- Volcando estructura para tabla heroku_baf49ff38aac61a.necesidad_beneficiario
CREATE TABLE IF NOT EXISTS `necesidad_beneficiario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `total` int(11) DEFAULT '0',
  `actual` int(11) DEFAULT '0',
  `id_beneficiario` int(11) DEFAULT NULL,
  `id_recurso` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_necesidad_beneficiario_beneficiario` (`id_beneficiario`),
  KEY `FK_necesidad_beneficiario_recurso` (`id_recurso`),
  CONSTRAINT `FK_necesidad_beneficiario_beneficiario` FOREIGN KEY (`id_beneficiario`) REFERENCES `beneficiario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_necesidad_beneficiario_recurso` FOREIGN KEY (`id_recurso`) REFERENCES `recurso` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla heroku_baf49ff38aac61a.necesidad_beneficiario: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `necesidad_beneficiario` DISABLE KEYS */;
/*!40000 ALTER TABLE `necesidad_beneficiario` ENABLE KEYS */;

-- Volcando estructura para tabla heroku_baf49ff38aac61a.orden_envio
CREATE TABLE IF NOT EXISTS `orden_envio` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_acopio` int(11) DEFAULT '0',
  `id_necesidad_beneficiario` int(11) DEFAULT '0',
  `destino` varchar(50) DEFAULT '0',
  `fecha_salida` date DEFAULT '0000-00-00',
  `origen` varchar(50) DEFAULT '0',
  `status` varchar(50) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FK_ORDEN_ENVIO_centro_de_acopio` (`id_acopio`),
  KEY `FK_ORDEN_ENVIO_necesidad_beneficiario` (`id_necesidad_beneficiario`),
  CONSTRAINT `FK_ORDEN_ENVIO_centro_de_acopio` FOREIGN KEY (`id_acopio`) REFERENCES `centro_de_acopio` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_ORDEN_ENVIO_necesidad_beneficiario` FOREIGN KEY (`id_necesidad_beneficiario`) REFERENCES `necesidad_beneficiario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla heroku_baf49ff38aac61a.orden_envio: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `orden_envio` DISABLE KEYS */;
/*!40000 ALTER TABLE `orden_envio` ENABLE KEYS */;

-- Volcando estructura para tabla heroku_baf49ff38aac61a.recurso
CREATE TABLE IF NOT EXISTS `recurso` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `categoria` int(11) NOT NULL,
  `id_unidad` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_RECURSO_unidad_de_medida` (`id_unidad`),
  KEY `FK_recurso_categoria` (`categoria`),
  CONSTRAINT `FK_RECURSO_unidad_de_medida` FOREIGN KEY (`id_unidad`) REFERENCES `unidad_de_medida` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_recurso_categoria` FOREIGN KEY (`categoria`) REFERENCES `categoria` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla heroku_baf49ff38aac61a.recurso: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `recurso` DISABLE KEYS */;
INSERT INTO `recurso` (`id`, `nombre`, `categoria`, `id_unidad`) VALUES
	(1, 'atun', 1, 21),
	(11, 'agua emotellada', 1, 11),
	(21, 'martillo', 11, 1);
/*!40000 ALTER TABLE `recurso` ENABLE KEYS */;

-- Volcando estructura para tabla heroku_baf49ff38aac61a.recurso_orden
CREATE TABLE IF NOT EXISTS `recurso_orden` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_orden` int(11) NOT NULL DEFAULT '0',
  `id_recurso` int(11) NOT NULL DEFAULT '0',
  `cantidad` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FK_recurso_orden_orden_envio` (`id_orden`),
  KEY `FK_recurso_orden_recurso` (`id_recurso`),
  CONSTRAINT `FK_recurso_orden_orden_envio` FOREIGN KEY (`id_orden`) REFERENCES `orden_envio` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_recurso_orden_recurso` FOREIGN KEY (`id_recurso`) REFERENCES `recurso` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla heroku_baf49ff38aac61a.recurso_orden: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `recurso_orden` DISABLE KEYS */;
/*!40000 ALTER TABLE `recurso_orden` ENABLE KEYS */;

-- Volcando estructura para tabla heroku_baf49ff38aac61a.unidad_de_medida
CREATE TABLE IF NOT EXISTS `unidad_de_medida` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `unidad` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla heroku_baf49ff38aac61a.unidad_de_medida: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `unidad_de_medida` DISABLE KEYS */;
INSERT INTO `unidad_de_medida` (`id`, `unidad`) VALUES
	(1, 'pieza'),
	(11, 'Litro'),
	(21, 'Kilogramo');
/*!40000 ALTER TABLE `unidad_de_medida` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
